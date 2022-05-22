// Invoices.tsx

import { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView } from "react-native";
import { Base, Typography } from '../styles/index.js';
import invoiceModel from "../models/invoices.ts";
import { DataTable } from "react-native-paper";

export default function InvoiceList( { route, navigation } ) {
    const { reload } = route.params || false;
    const [allInvoices, setAllInvoices] = useState([]);

    async function reloadInvoices() {
        const result = await invoiceModel.getInvoices();
        setAllInvoices(result);
    }

    if (reload) {
        reloadInvoices();
    }

    useEffect(() => {
        reloadInvoices();
    }, []);
    const listOfInvoices = allInvoices
        .map((invoice, index) => {
            return (
            <View key={index} style={Base.invlistContainer}>
                <DataTable>
                    <DataTable.Row style={ Base.invoiceListHeader }>
                        <DataTable.Cell><Text style={ Typography.invoiceListHeader }><Text style={ Typography.bold }>Faktura nr: </Text>{invoice.id}</Text></DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row style={ Base.invoiceList }>
                        <DataTable.Cell><Text style={ Typography.invoiceList }><Text style={ Typography.bold }>OrderID: </Text>{invoice.order_id}</Text></DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row style={ Base.invoiceListEven }>
                        <DataTable.Cell><Text style={ Typography.invoiceList }><Text style={ Typography.bold }>Summa: </Text>{invoice.total_price}</Text></DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row style={ Base.invoiceList }>
                        <DataTable.Cell><Text style={ Typography.invoiceList }><Text style={ Typography.bold }>Skapad: </Text>{invoice.creation_date}</Text></DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row style={ Base.invoiceListEven }>
                        <DataTable.Cell><Text style={ Typography.invoiceList }><Text style={ Typography.bold }>Betalas: </Text>{invoice.due_date}</Text></DataTable.Cell>
                    </DataTable.Row>
                </DataTable>
            </View>
            );});
    let noInvoices = "";
    if (listOfInvoices === undefined || listOfInvoices.length == 0) {
        noInvoices = "Inga fakturor funna.";
    }
    return (
        <ScrollView>
            <View>
                {listOfInvoices ? listOfInvoices : noInvoices}
                <Button
                title="Skapa ny faktura"
                onPress={() => {navigation.navigate('Skapa ny faktura')}}
                />
            </View>
        </ScrollView>
    );
}
