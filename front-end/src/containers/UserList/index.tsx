import {connect} from 'react-redux';
import UserList from '../../components/UserList';
import { ReduxState } from '../../Model/StateModel';

function mapStateToProps(state: ReduxState){

    return {friends : state.friends, byUserMessages: state.privateMessages.byUsers}
}
   

export default connect(mapStateToProps)(UserList)



