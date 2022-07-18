const ENDPOINT = "https://testapi.io/api/rcermeno1"; 
const PATH_UPLOADER = "/file-uploader";

/**
 * 
 * @param {File} file 
 * @returns "{ url: string }"
 */
export const uploadFile = async (file) => {

    return {
        url: 'https://placeimg.com/640/480/arch'
    }

    // const formData = new FormData();
    // formData.append(`files`, file);

    // const result = await fetch(`${ENDPOINT}${PATH_UPLOADER}`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'multipart/form-data'
    //     },
    //     body: formData
    // })
    
    // return result.json()
}