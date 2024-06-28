import { api } from "@/@core/application/utils/api";

// ENTERTAINMENT->LINKS

// GET-CAT
export const getCat = async () => {
  try {
    const res = await api.get("EntertainmentCategories/all");

    return res.data;
  } catch (err) {
    console.log(err, "err");
  }
};

// GET-DATA-BY-ID
export const getDataByid = async (id: number, params: { language: string }) => {
  try {
    const res = await api.get(`EntertainmentCategories/one/${id}`, { params });

    return res.data;
  } catch (err) {
    console.log(err, "err");
  }
};

// CONTENT
// GET
export const getData = async (url: string, params: { language: string }) => {
  try {
    const res = await api.get(`${url}/all`, { params });
    if (!res) return null;

    return res.data;
  } catch (err) {
    console.log(err, "err");
  }
};

// CREATE-CAT
export const createCat = async (values: string) => {
  try {
    const body = values;
    const res = await api.post("EntertainmentCategories/create", body);
    if (!res) return null;
    if (res.status === 201) return { status: "success", message: "Created" };
  } catch (err) {
    console.log(err);
  }
};

// DELETE-CAT
export const deleteCat = async (id: number) => {
  try {
    const res = await api.delete(`EntertainmentCategories/delete/${id}`);

    if (!res) return null;
    if (res.status === 204) return { status: "success", message: "Deleted" };
  } catch (err) {
    console.log(err, "err");
  }
};

// UPDATE-CAT
export const updateCat = async (id: number, value: string) => {
  try {
    const body = value;
    const res = await api.patch(`EntertainmentCategories/update/${id}`, body);
    if (!res) return null;
    if (res.status === 204) return { status: "success", message: "Updated" };
  } catch (err) {
    console.log(err, "err");
  }
};

// CREATE
export const createContent = async (url: string, body: any) => {
  try {
    const res = await api.post(`${url}/create`, body);
    if (!res) return null;
    if (res.status === 201) return { status: "success", message: "Created" };
  } catch (err) {
    console.log(err);
  }
};

// UPDATE
export const updateContent = async (
  url: string,
  body: any,
  id: string | number
) => {
  try {
    const res = await api.patch(`${url}/update/${id}`, body);

    if (!res) return null;
    if (res.status === 204) return { status: "success", message: "Updated" };
  } catch (err) {
    console.log(err, "err");
  }
};

// DELETE
export const deleteContent = async (url: string, id: any) => {
  try {
    const res = await api.delete(`${url}/delete/${id}`);
    if (!res) return null;
    if (res.status === 204) return { status: "success", message: "Deleted" };
  } catch (err) {
    console.log(err);
  }
};
