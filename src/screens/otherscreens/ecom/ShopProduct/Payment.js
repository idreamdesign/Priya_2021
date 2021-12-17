<View style={styles.viewStyle}>
  <Text
    style={{
      fontSize: 13,
      fontWeight: "bold",
      marginHorizontal: 20,
      marginVertical: 10,
    }}
  >
    Payment Methods
  </Text>
  <View style={{ flexDirection: "column", marginBottom: 5 }}>
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("cycleServicePayment", {
          component: "1",
        })
      }
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20,
        borderBottomWidth: 0.3,
        borderBottomColor: "grey",
        paddingBottom: 10,
        marginTop: 10,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <appImages.CreditCard width="30" height="30" />
        <Text style={{ marginLeft: 20, marginTop: 2 }}>
          Debit / Credit card
        </Text>
      </View>
      <FeaIcon
        name="chevron-right"
        size={20}
        color="black"
        style={{ marginTop: 3 }}
      />
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("cycleServicePayment", {
          component: "2",
        })
      }
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20,
        borderBottomWidth: 0.3,
        borderBottomColor: "grey",
        paddingBottom: 10,
        marginTop: 10,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <appImages.NetBanking width="30" height="30" />
        <Text style={{ marginLeft: 20, marginTop: 2 }}>Net Banking</Text>
      </View>
      <FeaIcon
        name="chevron-right"
        size={20}
        color="black"
        style={{ marginTop: 3 }}
      />
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("cycleServicePayment", {
          component: "3",
        })
      }
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20,
        paddingBottom: 10,
        marginTop: 10,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <appImages.Upi width="30" height="30" />
        <Text style={{ marginLeft: 20, marginTop: 2 }}>UPI</Text>
      </View>
      <FeaIcon
        name="chevron-right"
        size={20}
        color="black"
        style={{ marginTop: 3 }}
      />
    </TouchableOpacity>
  </View>
</View>;
