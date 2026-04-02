from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ('owner', 'ai_description', 'ai_category', 'ai_status', 'created_at')


class ProductCreateSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    price = serializers.DecimalField(max_digits=10, decimal_places=2)
    stock = serializers.IntegerField(default=0)
    image = serializers.ImageField(required=False)


class BulkUploadSerializer(serializers.Serializer):
    file = serializers.FileField()
