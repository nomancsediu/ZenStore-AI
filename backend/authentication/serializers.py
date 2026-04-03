from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    # Password field is write-only (never returned in API responses)
    password = serializers.CharField(write_only = True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        # Create user with hashed password instead of plain text
        return User.objects.create_user(**validated_data)


class UserSerializer(serializers.ModelSerializer):
    # Serializer for displaying user profile (read-only)
    class Meta:
        model = User
        fields = ('id', 'username', 'email')
