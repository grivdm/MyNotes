from rest_framework import status
from rest_framework.test import APITestCase
from ..models import User, Note


class NoteTests(APITestCase):

    def setUp(self):
        
        data = {
                'email': 'testuser@ex.com',
                'username': 'testuser',
                'password': '12345Qq-+'
            }   
        self.client.post('/api/auth/users/', data, format='json')
        
        response = self.client.post('/api/auth/jwt/create/', data, format='json')
        self.accesstoken = response.data['access']
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.accesstoken)
        self.data = {
            'user': User.objects.get().id,
            'content': 'Test note content'
        }

    def test_create_note(self):
        response = self.client.post('/api/note/', self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Note.objects.get().content, self.data['content'] )

    def test_list_notes(self):
        self.client.post('/api/note/', self.data, format='json')
        response = self.client.get(f'/api/note/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # self.assertEqual('Test note content', response.data[0]['content'])

    def test_get_note(self):
        self.client.post('/api/note/', self.data, format='json')
        response = self.client.get(f'/api/note/{str(Note.objects.get().id)}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['content'], 'Test note content')
        
    def test_update_note(self):
        self.client.post('/api/note/', self.data, format='json')
        updataed_data = { 'content': 'Updated test note content'}
        response = self.client.put(f'/api/note/{str(Note.objects.get().id)}/', updataed_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Note.objects.get().content, 'Updated test note content')

    def test_delete_note(self):
        self.client.post('/api/note/', self.data, format='json')
        response = self.client.delete(f'/api/note/{str(Note.objects.get().id)}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Note.objects.count(), 0)

    def test_note_permissions(self):
        self.client.post('/api/note/', self.data, format='json')
        self.client.force_authenticate(user=None)
        response = self.client.get(f'/api/note/{str(Note.objects.get().id)}/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        data = {
                        'email': 'testuser22@ex.com',
                        'username': 'testuser',
                        'password': '12345Qq-+'
                    }  
        self.client.post('/api/auth/users/', data, format='json')
        response = self.client.get(f'/api/note/{str(Note.objects.get().id)}/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
