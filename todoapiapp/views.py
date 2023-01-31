from rest_framework.response import Response
from rest_framework import viewsets
from .models import Note
from .serializers import NoteSerializer, MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .permissions import CustomPermission




class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer




class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [CustomPermission]

    def list(self, request):
        user = request.user
        query = self.queryset.order_by("-updated").filter(user=user)
        return Response(self.serializer_class(query, many=True).data)
