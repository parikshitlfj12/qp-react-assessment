type DummyTodoType = {
  id: string;
  completed: boolean;
  todo: string;
};

export const getTodoData = async () => {
  try {
    const res = await fetch("https://dummyjson.com/todos?limit=80");
    const data = await res.json();
    return data?.todos?.map((todo: DummyTodoType) => {
      return {
        id: todo?.id,
        completed: todo?.completed,
        text: todo?.todo,
      };
    });
  } catch (e) {
    console.log("Error fetching dummy todos - ", e);
    return [];
  }
};
