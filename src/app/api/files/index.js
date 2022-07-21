const PATH_UPLOADER = "/upload";

/**
 * 
 * @param {File} file 
 * @returns String[]
 */
export const uploadFile = async (file) => {

    const formData = new FormData();
    formData.append(`files`, file);

    const result = await fetch(`${process.env.REACT_APP_ENDPOINT}${PATH_UPLOADER}`, {
        method: 'POST',
        body: formData
    })
    
    return result.json()
}

/**
 * 
 * @param {File[]} files
 * @returns String[]
 */
export const uploadFiles = async (files) => {

    const formData = new FormData();
    files.forEach(f => formData.append(`files`, f));

    const result = await fetch(`${process.env.REACT_APP_ENDPOINT}${PATH_UPLOADER}`, {
        method: 'POST',
        body: formData
    })
    
    return result.json()
}