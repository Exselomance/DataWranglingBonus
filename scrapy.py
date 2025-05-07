import frontend1.scrapy as scrapy
import logging

class HHApiSpider(scrapy.Spider):
    name = "hh_api_all"
    allowed_domains = ["api.hh.ru"]

    custom_headers = {
        'User-Agent': 'hh_scraper/1.0 (uremail@lol.lol)' 
    }

    def start_requests(self):
        # begin at page 0
        url = "https://api.hh.ru/vacancies?text=python+developer&area=1&page=0&per_page=100"
        yield scrapy.Request(url, headers=self.custom_headers, callback=self.parse_list)

    def parse_list(self, response):
        if response.status != 200:
            self.logger.error(f"List request failed: {response.status}")
            return

        data = response.json()
        for vac in data.get('items', []):
            vac_id = vac.get('id')
            detail_api = f"https://api.hh.ru/vacancies/{vac_id}"
            # pass along the listing fields if you want to merge them later
            meta = {
                'listing_title': vac.get('name'),
                'listing_url':   vac.get('alternate_url'),
            }
            yield scrapy.Request(
                detail_api,
                headers=self.custom_headers,
                callback=self.parse_detail,
                meta=meta
            )


        page = data.get('page', 0)
        pages = data.get('pages', 0)
        if page + 1 < pages:
            next_url = (
                "https://api.hh.ru/vacancies"
                f"?text=python+developer&area=1&page={page+1}&per_page=100"
            )
            yield scrapy.Request(next_url, headers=self.custom_headers, callback=self.parse_list)

    def parse_detail(self, response):
        if response.status != 200:
            self.logger.error(f"Detail request failed ({response.url}): {response.status}")
            return

        data = response.json()
        salary = data.get('salary') or {}
        address = data.get('address') or {}
        yield {
            # listing-level
            'listing_title': response.meta['listing_title'],
            'listing_url':   response.meta['listing_url'],
            # detail-level
            'id':            data.get('id'),
            'name':          data.get('name'),
            'employer':      data.get('employer', {}).get('name'),
            'published_at':  data.get('published_at'),
            'salary_from':   salary.get('from'),
            'salary_to':     salary.get('to'),
            'experience':    data.get('experience', {}).get('name'),
            'address_raw':   address.get('raw'),
            'address_city':  address.get('city'),
            'address_lat':   address.get('lat'),
            'address_lng':   address.get('lng'),
            'address_description': address.get('description'),
            'key_skills':    [skill.get('name') for skill in data.get('key_skills', []) if skill.get('name')]
        }
