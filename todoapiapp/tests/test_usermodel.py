from rest_framework import status
from rest_framework.test import APITestCase
from ..models import User

class UserTests(APITestCase):

    def test_create_user(self):
        data = {
            'email': 'testuser@ex.com',
            'username': 'testuser',
            'password': '12345Qq-+'
        }
        response = self.client.post('/api/auth/users/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().email, 'testuser@ex.com')
        self.assertEqual(User.objects.get().username, 'testuser')

    def test_unique_email(self):
        data = {
            'email': 'testuser@ex.com',
            'username': 'testuser',
            'password': '12345Qq-+'
        }
        self.client.post('/api/auth/users/', data, format='json')
        response = self.client.post('/api/auth/users/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)

    def test_required_fields(self):
        data = {
            'email': '',
            'username': '',
            'password': ''
        }
        response = self.client.post('/api/auth/users/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 0)

    def test_invalid_email_format(self):
        data = {
            'email': 'testuser@ex',
            'username': 'testuser',
            'password': '12345Qq-+'
        }
        response = self.client.post('/api/auth/users/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 0)

    def test_is_superuser_field(self):
        data = {
            'email': 'testuser@ex.com',
            'username': 'testuser',
            'password': '12345Qq-+'
        }
        self.client.post('/api/auth/users/', data, format='json')
        user = User.objects.get()
        self.assertEqual(user.is_superuser, False)

    def test_password_length(self):
        data = {
            'email': 'testuser@ex.com',
            'username': 'testuser',
            'password': '1234'
        }
        response = self.client.post('/api/auth/users/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 0)

    def test_password_complexity(self):
        data = {
            'email': 'testuser@ex.com',
            'username': 'testuser',
            'password': 'password'
        }
        response = self.client.post('/api/auth/users/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 0)


