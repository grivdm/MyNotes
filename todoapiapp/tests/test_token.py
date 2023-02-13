from rest_framework import status
from rest_framework.test import APITestCase
from ..models import User
import jwt



class TokenTests(APITestCase):

    def test_successful_authentication(self):
            data = {
                'email': 'testuser@ex.com',
                'username': 'testuser',
                'password': '12345Qq-+'
            }
            
            self.client.post('/api/auth/users/', data, format='json')
            response = self.client.post('/api/auth/jwt/create/', data, format='json')
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertIn('access', response.data)
            # encoded = jwt.decode(response.data['access'], key, algorithms="HS256")
            # self.assertEqual(encoded['username'], User.objects.get().username)
            # self.assertEqual(encoded['user_id'], str(User.objects.get().id))
            self.assertIn('refresh', response.data)