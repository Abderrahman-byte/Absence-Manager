from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import bad_request
from rest_framework import permissions

from backend.core.permissions import IsAdmin

class AuthenticatedOnlyViewAPI (APIView):
    permission_classes = [permissions.IsAuthenticated]

class AdminOnlyAPIView (APIView) :
    permission_classes = [IsAdmin]

class SearchMixins () :
    model_class = None
    serializer_class = None

    def search(self, request, *args, **kwargs) :
        query = request.query_params.get('query')

        if query is None or query == '' : 
            raise bad_request

        if self.model_class is None or self.serializer_class is None : 
            return Response([])

        results = self.model_class.objects.search(query)
        return Response(self.serializer_class(results, many=True).data)