import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    base: {
        flex: 1,
        backgroundColor: '#fff',
        paddingLeft: 12,
        paddingRight: 12
    }, 
    header: {
        fontSize: 32,
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'Lato_700Bold',
        lineHeight: 36,
        backgroundColor: '#777',
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
        marginBottom: 4
    },
    whImage: {
        width: '100%',
        marginBottom: 4
    },
    invlist: {
        flex: 1,
        padding: 10,
        marginBottom: 1,
        borderBottomColor: '#eee',
        borderBottomWidth: 1, 
    },
    invHeader: {
      flex: 1,
      backgroundColor: '#ddd',
      padding: 10,
      marginBottom: 1
    },
    invText: {
      fontSize: 18,
      fontFamily: 'Lato_400Regular',
      lineHeight: 32,
    },
    invlistContainer: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    },
    orderListHeader: {
        fontSize: 18,
        textAlign: 'center',
        backgroundColor: '#ddd',
        color: '#333',
        padding: 10,
        marginBottom: 4
    },
    orderList: {
        fontSize: 18,
        backgroundColor: '#dddd',
        borderBottomColor: '#ddd',
        color: '#333',
        padding: 10,
        marginBottom: 4
    },
    orderProdList: {
        fontSize: 18,
        backgroundColor: '#ccc',
        color: '#333',
        padding: 10,
        marginBottom: 4
    },
    bold: {
        fontWeight: 'bold',
    }
});

export default styles;
