import { api } from "@/services/api";

async function getLocalFile(fileId: string) {
    const response = await api.get('http://localhost:3000/upload/' + fileId);
    return response.data;
}

async function createLocalFile(data: File) {
    let formData = new FormData();
    formData.append("file", data);
    const response = await api.post("http://localhost:3000/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if(response.status === 201) {
        return response.data;
    } else {
        return null;
    }
}

async function deleteLocalFile(fileId: string) {
    const response = await api.delete('http://localhost:3000/upload/' + fileId);
    return response.data;
}

export {
    getLocalFile,
    createLocalFile,
    deleteLocalFile,
}