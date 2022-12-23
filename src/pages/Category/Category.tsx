import { useState, useEffect } from 'react';
import { getResourcesByCategory } from '../Utils';
import { CATEGORIES } from './CategoryConst';
import Layout from '../../components/layout/layout/Layout';
import Loading from '../../components/factory/Loading/Loading';
import ResourceCard from '../../components/factory/ResourceCard/ResourceCard';
import Paragraph from '../../components/factory/Paragraph/Paragraph';
import isEmpty from 'lodash/isEmpty';
import './Category.scss';

interface CategoryProps {
  category: string;
}

interface Resource {
  id: number;
  name: string;
  url: string;
  description: string;
  image: string;
  locale: string;
  price: string;
  categories: number;
  tags: [];
}

type Resources = Resource[];

const CategoryPage = ({ category }: CategoryProps) => {
  const [loadingResourcesByCategory, setLoadingResourcesByCategory] = useState<
    boolean | null
  >(null);
  const [resourcesByCategory, setResourcesByCategory] = useState<Resources>([]);

  const filteredCategory = CATEGORIES.find(
    (CATEGORY) => CATEGORY.value === category
  );

  useEffect(() => {
    getResourcesByCategory(
      setResourcesByCategory,
      setLoadingResourcesByCategory,
      category
    );
  }, [filteredCategory]);

  return (
    <Layout>
      <div className="category">
        {loadingResourcesByCategory && <Loading />}
        {isEmpty(resourcesByCategory) && !loadingResourcesByCategory && (
          <Paragraph>{`No resources found in ${category}`} </Paragraph>
        )}
        {!loadingResourcesByCategory &&
          !isEmpty(resourcesByCategory) &&
          resourcesByCategory.map((resource) => {
            return <ResourceCard key={resource.id} resource={resource} />;
          })}
      </div>
    </Layout>
  );
};

export default CategoryPage;
