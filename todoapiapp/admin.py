from django.contrib import admin
from .models import Note  
from django.contrib.auth import get_user_model
User = get_user_model()

@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    list_display = ('id', 'updated',)

admin.site.register(User)