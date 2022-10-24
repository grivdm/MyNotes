from django.db import models


class Note(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    content = models.TextField(null=True, blank=True) 
    def __str__(self):
        return self.content[:50]
    