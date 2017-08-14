import Vue from 'vue'
import Router from 'vue-router'

import Appointment from '../components/appointment'
import Selectcity from '../components/selectCity'
import Selectseat from '../components/selectSeat'
import PassengerInfo from '../components/passengerInfo'
import AddPerson from '../components/addPerson'
import ScanResult from '../components/scanResult'
import OrderDetail from '../components/orderDetail'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/appointment/'
    },
    {
      path: '/appointment',
      component: Appointment,
    },
    {
      path: '/selectcity/:cityname',
      name:'Selectcity',
      component: Selectcity
    },
    {
      path: '/selectseat/:sumSeat/:startdata/:starttime/:line/:carnum/:price/:lineid',
      name:'Selectseat',
      component: Selectseat
    },
    {
      path: '/passengerInfo/:ids/:price/:lineid/:carnumber',
      name:'PassengerInfo',
      component: PassengerInfo
    },
    {
      path: '/addPerson/:id/:idCard/:phone/:username',
      name:'AddPerson',
      component: AddPerson
    },
    {
      path: '/scanresult/:appointment/:amount/:carnumber/:producelineid/:contratid',
      name:'ScanResult',
      component: ScanResult
    },
    {
      path: '/orderDetail/:parentid',
      name:'OrderDetail',
      component: OrderDetail
    },
  ]
});

