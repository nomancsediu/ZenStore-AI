from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

from .models import Product
from .serializers import ProductSerializer, ProductCreateSerializer, BulkUploadSerializer
from .services import ProductService
from core.decorators import performance_logger

# List all products belonging to the authenticated user (cached)
class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        return Product.objects.filter(owner=self.request.user)

    @performance_logger
    def list(self, request, *args, **kwargs):
        cached = ProductService.get_cached_products(request.user.id)
        if cached:
            return Response(cached)
        response = super().list(request, *args, **kwargs)
        ProductService.set_cached_products(request.user.id, response.data)
        return response

# Create a single product and trigger AI enhancement in background
class ProductCreateView(generics.CreateAPIView):
    serializer_class = ProductCreateSerializer
    parser_classes = (MultiPartParser, FormParser) #Allows file uploads for product images

    def perform_create(self, serializer):
        data = serializer.validated_data
        ProductService.create_product(
            owner=self.request.user,
            name=data['name'],
            price=data['price'],
            stock=data['stock'],
            image=data.get('image'),
        )

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({'detail': 'Product created.'}, status=status.HTTP_201_CREATED)


# Retrieve, update, or delete a product (owner only)
class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        return Product.objects.filter(owner=self.request.user)

    def perform_update(self, serializer):
        serializer.save()
        ProductService.invalidate_cache(self.request.user.id)

    def perform_destroy(self, instance):
        instance.delete()
        ProductService.invalidate_cache(self.request.user.id)

# Upload a CSV or JSON file to create multiple products in bulk
class BulkUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = BulkUploadSerializer

    @performance_logger
    def post(self, request):
        serializer = BulkUploadSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        uploaded_file = serializer.validated_data['file'] #Extract the uploaded file object
        try:
            result = ProductService.bulk_create_from_file(
                owner=request.user,
                file_obj=uploaded_file,
                file_name=uploaded_file.name,
            )
        except ValueError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(result, status=status.HTTP_201_CREATED)