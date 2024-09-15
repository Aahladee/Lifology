export default function getUserList(){
    return(
        fetch('https://dummyjson.com/users')
        .then((response) => response.json())
        .then((json) => {
            // console.log('json',json);
            return json;
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    )
}

export async function getUserPost(userId: number){
    console.log("🚀 ~ getUserPost ~ userId:", typeof(userId))
    return(
       await fetch(`https://dummyjson.com/users/${userId}/posts`)
        .then((response) => 
            // console.log('response aaaaaaa',JSON.stringify(response))
            response.json()
        )
        .then((json) => {
            // console.log('json',json);
            return json;
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    )
}