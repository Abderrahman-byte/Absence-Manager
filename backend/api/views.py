from rest_framework.response import Response
from rest_framework.exceptions import APIException
from backend.core.utils import parse_excel, parse_csv
from backend.core.views import AuthenticatedOnlyViewAPI
import filetype

class ParseExcelCSV (AuthenticatedOnlyViewAPI):
    def post(self, request, *args, **kwargs) :
        file = request.FILES.get('file')
        
        if file is None : raise APIException(detail='expected file field.', code='expected_file')

        mime = filetype.guess_mime(file)

        if mime == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            data = parse_excel(file)
        elif mime == 'text/csv' :
            data = parse_csv(file)
        else :
            raise APIException(detail='Unexpected file type.', code='unexpected_file')

        
        return Response(data)