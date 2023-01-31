from rest_framework.serializers import ModelSerializer
from .models import Note
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = "__all__"

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["username"] = user.username
        return token