<template>
  <div class="no-print">
    <select v-model="client">
      <option v-for="client in clients" :value="client">{{ client.name }}</option>
    </select>
    <input v-model="invoice.date" type="date">
  </div>
  <div class="printable">
    <div class="text-left">
      {{ name }}
      <br>
      {{ company.name }}
      <br>
      {{ company.address }}
      <br>
      {{ company.address2 }}
      <br>
      MB: {{ company.mb }}
      <br>
      PIB: {{ company.pib }}
      <br>
      TR: {{ company.accountNumber }}
    </div>
    <div class="header">
      Račun
    </div>
    <div class="hbox">
      <div class="text-left">
        <table>
          <tr>
            <td>Račun broj</td>
            <td><editable v-model="invoice.number" :display="invoiceNumber" /></td>
          </tr>
          <tr>
            <td>Datum računa</td>
            <td>{{ invoiceDate }}</td>
          </tr>
          <tr>
            <td>Datum plaćanja</td>
            <td>{{ invoiceDate }}</td>
          </tr>
        </table>
      </div>
      <div class="flex-auto text-right">
        {{ client.name }}
        <br>
        {{ client.address }}
        <br>
        {{ client.address2 }}
        <br>
        {{ client.mb }}
        <br>
        {{ client.pib }}
      </div>
    </div>
    <div class="main-table">
      <table class="text-left full-width table-main table-padding">
        <tr>
          <th> Naziv </th>
          <th> Opis </th>
          <th class="text-right"> Cena </th>
          <th class="text-right"> Količina </th>
          <th class="text-right"> Ukupno </th>
        </tr>
        <tr v-for="item in invoice.items">
          <td> <editable :edit="edit" v-model="item.title" /> </td>
          <td> <editable :edit="edit" v-model="item.description" /> </td>
          <td class="text-right"> <editable :edit="edit" v-model="item.price" :display="formatPrice(item.price)" /> </td>
          <td class="text-right"> <editable :edit="edit" v-model="item.quantity" /> </td>
          <td class="text-right"> {{ formatPrice(item.quantity * item.price) }} </td>
        </tr>
        <tr>
          <td colspan="5"> &nbsp; </td>
        </tr>
      </table>
      <div class="text-left">
        <table class="table-sum table-padding" style="">
          <tr>
            <td> Ukupno </td>
            <td class="text-right"> {{ formatPrice(total) }} </td>
          </tr>
          <tr>
            <td> Plaćanje </td>
            <td class="text-right"> 0 </td>
          </tr>
          <tr class="strong-row">
            <td>
              Za uplatu (RSD)
            </td>
            <td class="text-right"> {{ formatPrice(total) }} </td>
          </tr>
          <tr class="strong-row">
            <td> Rečima </td>
            <td>
              {{ stringPrice }} dinara
            </td class="text-right">
          </tr>
        </table>
      </div>
    </div>
    <div class="text-left text-small invoice-notes">
      Na osnovu člana 33 Zakona o PDV, ovaj račun je oslobo]en poreza na dodatu vrednost.
      <br>
      Ovaj račun je validan bez pečata i potpisa.
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase';

  const firebaseConfig = {
    apiKey: "AIzaSyB2QcCumkx7hQAp_aDjXsGYuXxejL7ZFsU",
    authDomain: "invoice-generator-e7852.firebaseapp.com",
    projectId: "invoice-generator-e7852",
    storageBucket: "invoice-generator-e7852.appspot.com",
    messagingSenderId: "514862196576",
    appId: "1:514862196576:web:f91110747984775423a005",
    measurementId: "G-7RG47JGJLL"
  };
  firebase.initializeApp(firebaseConfig);

import formatToString from './broj-u-slova.js';

import Editable from './Editable.vue';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {Editable},
  data() {
    return {
      edit: false,
      clients: [],
      name: 'Damir Miladinov',
      company: {
        name: 'CORE PLAN BEOGRAD',
        address: 'Draže Pavlovića 2a',
        address2: '11120 Beograd',
        mb: '65989425',
        pib: '112266558',
        accountNumber: '265175031000157431'
      },
      client: {
        name: 'ART Nekretnine doo',
        address: 'Dositejeva 9',
        address2: '11000 Beograd',
        mb: '21053465',
        pib: '108716284'
      },
      invoice: {
        number: 1,
        date: '2021-02-08',
        items: [{
          title: 'Naknada za pružanje usluga',
          description: 'Račun za Decembar',
          price: 20000,
          quantity: 1
        }]
      }
    }
  },
  computed: {
    stringPrice() {
      return formatToString(this.total);
    },
    invoiceNumber() {
      return String(this.invoice.number).padStart(8, '0');
    },
    totalWords() {
    },
    total() {
      return this.invoice.items.reduce((col, a) => col + a.quantity * a.price ,0)
    },
    invoiceDate(){
      return new Intl.DateTimeFormat('sr-Latn', {
        month: 'long',
        year: 'numeric',
        day: 'numeric'
      }).format(new Date(this.invoice.date))
    }
  },
  mounted() {
    firebase.firestore().collection('clients').onSnapshot(({docs}) => {
      this.clients = docs.map(doc => ({id: doc.id, ...doc.data()}));
    });
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'RSD',minimumFractionDigits: 2 }).format(price);
    },
    // create() {
    //   firebase.firestore().collection('clients').add({
    //     name: 'Test'
    //   });
    // }
  }
}
</script>

<style>
  body {
    line-height: 1.3em;
    font-size: 14px;
  }
  table {
    border-collapse: collapse;
  }
  .table-padding td, .table-padding th{
    padding: 4px 10px;
  }
  .main-table {
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .header {
    font-size: 36px;
    margin: 40px 0;
  }
  .text-left {
    text-align: left;
  }
  .text-right {
    text-align: right;
  }
  .full-width {
    width: 100%;
  }
  .hbox {
      display: flex;
      flex-direction: row !important;
      position: relative;
  }
  .flex-auto {
      flex: auto;
  }
  .table-main {
    margin-top: 150px;
  }
  .table-main th,
  .table-main td{
    border-top: thin solid #999;
  }
  .table-main tr:last-child td{
    border-bottom: thin solid #999;
  }

  .table-sum {
    margin-left: auto
  }
  .strong-row {
    background: rgba(0,0,0,0.05);
    border-left: thin solid #999;
    border-right: thin solid #999;
  }
  .strong-row td{
    border-top: thin solid #999;
    border-bottom: thin solid #999;
  }
  .text-small {
    font-size: 0.8rem;
  }
  .invoice-notes {
    margin-top: 140px;
  }

  @media print {
    .no-print {
      display: none;
    }
  }
</style>
