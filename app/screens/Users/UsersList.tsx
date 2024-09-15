import {Text, View,StyleSheet, TouchableOpacity,FlatList, Image, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import getUserList from 'app/services/UserApi';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');


interface Hair {
    color: string;
    type: string;
  }
  
  interface Coordinates {
    lat: number;
    lng: number;
  }
  
  interface Address {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: Coordinates;
    country: string;
  }
  
  interface Bank {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  }

  interface Company {
    department: string;
    name: string;
    title: string;
    address: Address;
  }
  
  interface Crypto {
    coin: string;
    wallet: string;
    network: string;
  }

  interface User {
    id: number;
    firstName: string;
    lastName: string;
    name?: string;
    maidenName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: Hair;
    ip: string;
    address: Address;
    macAddress: string;
    university: string;
    bank: Bank;
    company: Company;
    ein: string;
    ssn: string;
    userAgent: string;
    crypto: Crypto;
    role: string;
  }

const UsersList: React.FC = () => {
    const navigator = useNavigation();``
    const [data, setData] = React.useState<User[]>([]);
    
    const renderItem = ({ item }: {item: User} ) => {
        // console.log('item',item);
        return (
            <TouchableOpacity 
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => {
                console.log('item',typeof(item.id));
                navigator.navigate('UserPost', 
                    {
                        userId: item.id
                    }
                );

            }}
            > 
                <View style={{flexDirection:'row'}}>
                    <View
                    style={{
                        marginHorizontal:10,
                        borderRadius:99,
                        overflow:'hidden',
                        // backgroundColor:'red'
                    }}
                    >
                        <Image 
                            source={{uri: item.image}}
                            style={{width: 50, height: 50,overflow:'hidden',borderRadius:99}}
                        />   
                    </View>
                    <View style={{
                        marginHorizontal:10,
                    }}>
                        <Text style ={{fontWeight:"bold"}}>{item.name}</Text>
                        <Text>{item.email}</Text>
                        <Text>{item.phone}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    useEffect(() => {
        getUserList().then((response) => {
            let newData: User[] = [];
            response?.users.map((user: User) => {
                newData.push({ 
                    ...user,
                    name: `${user.firstName} ${user.lastName}`,
                });
            });
            // console.log('data',data);
            setData(newData);
        });
    }, []);

    return (
      <View style={styles.container}>
       <View
            style={{
                // flexDirection:'row',
                // justifyContent:'space-between',
                // alignItems:'center'
                marginTop: StatusBar.currentHeight || deviceHeight*0.025,
            }}
       > 
            <Text 
                style ={{
                    fontWeight:"bold",
                    fontSize:20,
                    marginVertical:15,
                    color:'#252626'
                }}
            >
                LIFOLOGY USERS
            </Text>
        </View>
        <FlatList
            data={data}
            renderItem={({item}) => renderItem({item})}
            keyExtractor={(item:any) => item.id}
            showsVerticalScrollIndicator={false}
            maxToRenderPerBatch={8}
            onEndReached={() => 
                console.log('end reached')                  
            }
        />
        
      </View>
    );
  };

export default UsersList;

const styles=StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: 'white',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 0.3,
        borderColor: 'grey',
        marginVertical:8,
        paddingVertical: 12,
        elevation: 3,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        marginBottom:20
    },
})
