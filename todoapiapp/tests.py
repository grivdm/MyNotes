from django.test import TestCase
from .models import Note

class NoteModelTest(TestCase):

    def test_note_crud(self):
        notes_before = len(Note.objects.all())
        data= {
            'content': 'TestContent'
        }
        new_note = Note.objects.create(**data)
        new_note.save()
        self.assertEqual(len(Note.objects.all()), notes_before+1)
        self.assertEqual(new_note.created, new_note.updated)

        print(new_note)
        
        new_note.content = 'New Text'
        new_note.save()
        self.assertNotEqual(new_note.created, new_note.updated)

        new_note.delete()
        self.assertEqual(len(Note.objects.all()), notes_before)





