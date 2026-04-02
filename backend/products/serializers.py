from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ('owner', 'ai_description', 'ai_category', 'created_at')


class ProductCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('name', 'price', 'stock', 'image')


class BulkUploadSerializer(serializers.Serializer):
    file = serializers.FileField()