import { useState } from 'react';
import { Outlet } from '@remix-run/react';
import { mergeMeta } from '~/utils';

import type { Handle } from '~/types/handle';
import { searchPages } from '~/constants/tabLinks';
import { BreadcrumbItem } from '~/components/elements/Breadcrumb';

export const meta = mergeMeta(() => [
  { title: 'Nmovies - Search' },
  { name: 'description', content: 'Search Movies, Tv Series and Anime on Nmovies' },
  { property: 'og:url', content: 'https://sorachill.vercel.app/search' },
  { property: 'og:title', content: 'Nmovies - Search' },
  { property: 'og:image', content: 'https://sorachill.vercel.app/api/ogimage?it=search' },
  { property: 'og:description', content: 'Search Movies, Tv Series and Anime on Nmovies' },
  { name: 'twitter:title', content: 'Nmovies - Search' },
  { name: 'twitter:image', content: 'https://sorachill.vercel.app/api/ogimage?it=search' },
  { name: 'twitter:description', content: 'Search Movies, Tv Series and Anime on Nmovies' },
]);


interface SearchPageProps {
  searchQuery: string;
}

const allCategoriesData = [
  { category: 'movies', title: 'Movie 1' },
  { category: 'movies', title: 'Movie 2' },
  { category: 'tvSeries', title: 'TV Series 1' },
  { category: 'anime', title: 'Anime 1' },
];

export const handle: Handle = {
  breadcrumb: ({ t }) => (
    <BreadcrumbItem to="/search" key="search">
      {t('search.action')}
    </BreadcrumbItem>
  ),
  showTabLink: true,
  tabLinkPages: searchPages,
  tabLinkTo: () => '/search/',
  miniTitle: ({ t }) => ({
    title: t('search.action'),
    showImage: false,
  }),
};

const SearchPage = (props: SearchPageProps) => {
  const { searchQuery } = props;
  const [filteredResults, setFilteredResults] = useState<Array<{ category: string; title: string; }>>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    const filteredData = allCategoriesData.filter((item) =>
      item.title.toLowerCase().includes(query)
    );
    setFilteredResults(filteredData);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <ul>
        {filteredResults.map((item, index) => (
          <li key={index}>{item.title}</li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
};

export default SearchPage;