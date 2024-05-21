type DummyTodoType = {
  id: string;
  completed: boolean;
  todo: string;
};

export const getTodoData = async () => {
  try {
    const res = await fetch("https://dummyjson.com/todos?limit=80");
    const data = await res.json();
    return {
      todos: data?.todos?.map((todo: DummyTodoType, index: number) => {
        return {
          id: index + 1,
          completed: todo?.completed,
          text: todo?.todo,
        };
      }),
      totalItems: data?.limit,
    };
  } catch (e) {
    console.log("Error fetching dummy todos - ", e);
    return {
      todos: [],
      totalItems: 0,
    };
  }
};
