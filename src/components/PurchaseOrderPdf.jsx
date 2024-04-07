import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import ItemsTable from "./ItemsTable";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
  },
  name: {
    flexDirection: "column",
    justifyContent: "flex-start",
    fontSize: 22,
    marginBottom: 5,
  },
  poNumber: {
    flexDirection: "column",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
  },
  label: {
    fontSize: 12,
    marginBottom: 5,
  },
  input: {
    marginBottom: 10,
    paddingBottom: 5,
  },
  vendor: {
    borderTopWidth: 1,
    marginTop: 20,
    marginBottom: 10,
  },
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: "2",
  },
});

const PurchaseOrderPdf = ({
  companyDetails,
  vendorDetails,
  shipTo,
  total,
  items,
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.header}>Purchase Order</Text>
          <View>
            <Text style={styles.name}>{companyDetails.name}</Text>
          </View>

          <View style={styles.poNumber}>
            <Text style={styles.label}>PURCHASE ORDER NO.</Text>
            <Text style={styles.input}>{companyDetails.poNumber}</Text>
          </View>

          <View style={styles.poNumber}>
            <Text style={styles.label}>ADDRESS</Text>
            <Text style={styles.input}>{companyDetails.address}</Text>
          </View>

          <View style={styles.vendor}></View>

          <View style={styles.container}>
            <View>
              <Text style={styles.label}>VENDOR</Text>

              <View>
                <Text style={styles.name}>{vendorDetails.vendorName}</Text>
              </View>

              <View style={styles.poNumber}>
                <Text style={styles.label}>VENDOR ADDRESS</Text>
                <Text style={styles.input}>{vendorDetails.vendorAddress}</Text>
              </View>
            </View>

            <View>
              <Text style={styles.label}>SHIP TO</Text>

              <View>
                <Text style={styles.name}>{shipTo.shipToName}</Text>
              </View>

              <View style={styles.poNumber}>
                <Text style={styles.label}>ADDRESS</Text>
                <Text style={styles.input}>{shipTo.shipToAddress}</Text>
              </View>
            </View>
          </View>

          <ItemsTable items={items} total={total} />
        </View>
      </Page>
    </Document>
  );
};

export default PurchaseOrderPdf;
