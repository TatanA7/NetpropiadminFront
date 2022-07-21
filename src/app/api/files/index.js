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
 * @param {Number} buildId
 * @returns String[]
 */
export const uploadFiles = async (files, buildId) => {

    const formData = new FormData();
    formData.append('buildId', buildId);
    files.forEach(f => formData.append(`files`, f));

    const result = await fetch(`${process.env.REACT_APP_ENDPOINT}${PATH_UPLOADER}`, {
        method: 'POST',
        body: formData
    })
    
    return result.json()
}