import { Pagination, PostList } from './_components';

const Home = () => (
  <div>
    <div className="flex flex-wrap gap-2 leading-loose">
      <PostList />
    </div>
    <Pagination />
  </div>
);

export default Home;
