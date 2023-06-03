from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.core.exceptions import ValidationError

from contact.models import Contact
from contact.api.serializers import ContactSerializer


class ContactView(APIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

    def get_contact(self, pk):
        try: 
            return Contact.objects.get(pk=pk)
        except Contact.DoesNotExist:
            return None
        
        except ValidationError:
            return None

    def get(self, request, pk):
        contact = self.get_contact(pk)
        if contact is None:
            return Response(
                {'error': 'Contact not found.'},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = ContactSerializer(contact)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def patch(self, request, pk):
        contact = self.get_contact(pk)
        if contact is None:
            return Response(
                {'error': 'Contact not found.'},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = ContactSerializer(contact, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    
    def delete(self, request, pk):
        contact = self.get_contact(pk)
        if contact is None:
            return Response(
                {'error': 'Contact not found.'},
                status=status.HTTP_404_NOT_FOUND
            )
        contact.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)