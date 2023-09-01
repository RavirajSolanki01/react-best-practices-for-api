import request from "../requests";
import { ITodoResult } from "../../Types/Types";
// import { ITodoResult } from "../types";

export default class TodoService {
  todoGet = async (): Promise<Array<ITodoResult>> => {
    try {
      const res = await request({
        method: "GET",
        url: "/todos",
      });
      return res.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  todoAdd = async (data: ITodoResult): Promise<ITodoResult> => {
    try {
      const res = await request({
        method: "POST",
        url: `/todos`,
        data,
      });
      return res.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  todoDelete = async (id: number): Promise<ITodoResult> => {
    try {
      const res = await request({
        method: "DELETE",
        url: `/todos/${id}`,
      });
      return res.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  todoEdit = async (data: ITodoResult): Promise<ITodoResult> => {
    try {
      const res = await request({
        url: `/todos/${data.id}`,
        method: "PUT",
        data,
      });
      return res.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };
}
