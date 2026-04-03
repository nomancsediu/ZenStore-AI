from rest_framework import generics, permissions
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer, UserSerializer

# Get the custom User model (or default Django User)
User = get_user_model()

# View for new user registration (signup)
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()  # Query all users for uniqueness check
    serializer_class = RegisterSerializer
    permission_classes = (permissions.AllowAny,) # Allow anyone to register (no authentication required)


class ProfileView(generics.RetrieveAPIView):
    # View for authenticated user to view their own profile
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
