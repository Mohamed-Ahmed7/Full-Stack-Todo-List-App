import { useState, type ChangeEvent } from "react";
import TodoSkeleton from "../components/TodoSkeleton";
import Paginator from "../components/ui/Paginator";
import useCustomQuery from "../hooks/useCustomQuery";
import type { ITodo } from "../interfaces";
import Button from "../components/ui/Button";
import { Select } from "@headlessui/react";

const TodosPage = () => {
  const userDataString = localStorage.getItem("loggedInUser");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("ASC");
  // ** Handlers
  const onClickPrev = () => setPage((prev) => prev - 1);
  const onClickNext = () => setPage((prev) => prev + 1);
  const onChangePageSize = (e: ChangeEvent<HTMLSelectElement>) => {
    setPageSize(+e.target.value);
  };
  const onChangeSortBy = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  // ** Fetch Data By React Query
  const { isLoading, isFetching, data, error } = useCustomQuery({
    queryKey: [`todos-page-${page}`, `${pageSize}`, `${sortBy}`],
    url: `/todos?pagination[pageSize]=${pageSize}&pagination[page]=${page}&sort=createdAt:${sortBy}`,
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    },
  });
  if (isLoading)
    return (
      <div className="max-w-2xl mx-auto space-y-1 px-4">
        {Array.from({ length: 3 }, (_, idx) => (
          <TodoSkeleton key={idx} />
        ))}
      </div>
    );
  if (error) return "An error has occurred: " + error.message;
  return (
    <>
      <div className="flex items-center justify-between max-w-2xl mx-auto space-x-2 px-4 mb-10">
        <Button
          size="sm"
          // onClick={onGenerateTodos}
          title="Generate 100 records"
        >
          Generate todos
        </Button>
        <div className="flex items-center justify-between space-x-2 text-md">
          <Select
            className="border-2 border-indigo-600 rounded-md p-2"
            value={sortBy}
            onChange={onChangeSortBy}
          >
            <option disabled>Sort by</option>
            <option value="ASC">Oldest</option>
            <option value="DESC">Latest</option>
          </Select>
          <Select
            className="border-2 border-indigo-600 rounded-md p-2"
            value={pageSize}
            onChange={onChangePageSize}
          >
            <option disabled>Page Size</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </Select>
        </div>
      </div>
      <div className="max-w-2xl mx-auto space-y-3 px-4">
        {data.data.length ? (
          data.data.map(({ id, documentId, title }: ITodo, idx: number) => (
            <div
              key={documentId}
              className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md shadow-md even:bg-gray-100 "
            >
              <h3 className="w-full font-semibold">
                {id} - {idx + 1} - {title}
              </h3>
            </div>
          ))
        ) : (
          <h3>No todos yet!</h3>
        )}
        <Paginator
          page={page}
          pageCount={data?.meta?.pagination.pageCount}
          total={data?.meta?.pagination.total}
          isLoading={isLoading || isFetching}
          onClickPrev={onClickPrev}
          onClickNext={onClickNext}
        />
      </div>
    </>
  );
};
export default TodosPage;
