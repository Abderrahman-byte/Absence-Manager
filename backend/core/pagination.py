from rest_framework.pagination import PageNumberPagination

class StandardResultsSetPagination(PageNumberPagination):
    """A customization of :class:`PageNumberPagination`"""
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000

    def __init__(self, page_size=100, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.page_size = page_size