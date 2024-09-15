import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator, Alert, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { getUserPost } from 'app/services/UserApi';
import { Ionicons } from '@expo/vector-icons';
import LikeIcons from 'react-native-vector-icons/AntDesign';
import DisLikes from 'react-native-vector-icons/Foundation';
import Views from 'react-native-vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';

// Get device width and height
const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

type Props = {
    navigation: NavigationProp<any>
    route: RouteProp<any, any>
}

export default function UserPost({route}:Props) {
    const [newPostData, setNewPostData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false); // New state to track if data has been loaded
   
    const fetchData = async () => {
        setIsLoading(true);
        // Simulate an async operation like fetching data
        setTimeout(() => {
          setIsLoading(false);
          setDataLoaded(true);
        }, 2000); // 2 seconds delay
    };
    
    const dataNotFound = () => {
        return(
            <View style={styles.DataNotFoundText}>
                <Text>No Data Found</Text>
            </View>
        )
    }

    const renderItem = ({item}) => {
        console.log('item',item);
        return(
            <View style={styles.PostsCard}>
                <Text style={styles.PostTitleTxt}>{item.title}</Text>
                <Text numberOfLines={15} style={styles.PostBodyTxt}>{item.body}</Text>

                <View style={styles.display}>
                    <View style={styles.likesView}>
                        <LikeIcons name="heart" size={22} color="red"/>
                        <Text style={styles.likeText}>
                            {item.likes}
                            </Text>
                    </View>

                    <View style={styles.likesView}>
                        <DisLikes name="dislike" size={25} color="black"/>
                        <Text style={styles.likeText}>
                            {item.dislikes}
                            </Text>
                    </View>
                    
                    <View style={styles.likesView}>
                        <Views name="eye" size={22} color="black"/>
                        <Text style={styles.likeText}>
                            {item.views}
                            </Text>
                    </View>

                </View>
            </View>
        )
        
    }
    
    useEffect(() => {
        getUserPost(route.params?.userId)
        .then((response) => {
            // Map over the posts and extract title and body
            const posts = response.posts.map((post: any) => ({
              title: post.title,
              body: post.body,
              likes: post.reactions.likes,
              dislikes: post.reactions.dislikes,
              views: post.views,
            }));
            setNewPostData(posts);
            setDataLoaded(true);
          })
          .catch((error) => {
            console.error('Error fetching posts:', error);
            setDataLoaded(true);
          });
        fetchData();
    }, [route.params?.userId])

  return (
    <>
    <View style={styles.mainContainerView}>
        <View style={styles.headerView}>
        <BackButton/>
        <View>
            <Text
                style ={styles.UserPostText}
            >UserPost</Text>
        </View>
        </View>
         { 
        !isLoading && dataLoaded && newPostData.length > 0
         ?
         <FlatList
            data={newPostData}
            renderItem={({item}) => renderItem({item})}
            keyExtractor={(item:any) => item.id}
            style={styles.container}
            showsVerticalScrollIndicator={false}
         />
         :
         !isLoading && dataLoaded && newPostData.length === 0
         ? dataNotFound()
         :
         <View 
         style={styles.loaderView}
         >
            <ActivityIndicator size="large" color="#0000ff" />
         </View>
         }
    </View>
    </>
  )
}



const styles = StyleSheet.create({
    Container:{
       
        marginHorizontal:16,
        // backgroundColor:'#fff'
    },
    container: {
        // Your container style
      },
      postContainer: {
        justifyContent: 'space-around',
        alignContent: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E5E5E5',
      },
      postTitle: {
        fontWeight: "bold",
        fontSize: 20,
      },
      postBody: {
        marginVertical: 10,
        color: '#818182',
        textAlign: 'left',
        fontSize: 16,
      },
      statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#E5E5E5',
      },
      statItem: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center',
      },
      statText: {
        color: '#818182',
        marginHorizontal: 8,
      },
      DataNotFoundText:{
        flex:1,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    },
    PostsCard: {
        justifyContent:'space-around',
        alignContent:'center',
        padding:10,
        marginHorizontal:16,
        backgroundColor:'#fff',
        borderRadius:10,
        borderWidth:1,
        borderColor:'#E5E5E5',
        marginVertical:10
    },
    PostTitleTxt:{
        fontWeight:"bold",
        fontSize:20,
    },
    PostBodyTxt:{
        marginVertical:10,
        color:'#818182',
        textAlign:'left',
        fontSize:16
    },
    display:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10,
        borderRadius:10,
        backgroundColor:'#E5E5E5',
    },
    likesView:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignContent:'center'
    },
    likeText:{
        color:'#818182',
        marginHorizontal:8
    },
    mainContainerView:{
        flex:1,
        backgroundColor:'#fff',
    },
    headerView:{
        flexDirection:'row',
        alignContent:'center',
        padding:10,
        backgroundColor:'#fff',
        borderBottomColor:'#E5E5E5',
        paddingTop: StatusBar.currentHeight || deviceHeight*0.05,
    },
    UserPostText:{
        fontWeight:"bold",
        fontSize:20,
        marginVertical:deviceHeight*0.01,
        marginHorizontal:10,
        color:'#252626',
        bottom:7
    },
    loaderView:{
        flex:1,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
 },
 BackButton:{
    marginVertical:deviceHeight*0.005,
}
})

export function BackButton() {
    const navigation = useNavigation();
    return (
       
        <TouchableOpacity 
        style={styles.BackButton}
        onPress={() => navigation.goBack()} 
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
    )
}