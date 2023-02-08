parking.provider("parkingService", function (parkingConfig) {
    var _parkingRate = parkingConfig.parkingRate;

    var _calculateTicket = (car)=> {
        // console.log(car);
        var departHour = new Date().getHours();
        var entranceHour = new Date(car.entrance).getHours();
        // console.log(entranceHour);
        var parkingPeriod = departHour - entranceHour*1;
        var parkingPrice = parkingPeriod * _parkingRate;
/* 
        var departMinute = new Date().getMinutes();
        var entranceMinute = car.entrance.getMinutes();
        var parkingPeriodMinute = departMinute - entranceMinute;
        var parkingPriceMinute = parkingPeriodMinute * _parkingRate;

        var departSecond = new Date().getSeconds();
        var entranceSecond = car.entrance.getSeconds();
        var parkingPeriodSecond = departSecond - entranceSecond;
        var parkingPriceSecond = parkingPeriodSecond * _parkingRate;
 */
        return {
            period: parkingPeriod,
            price: parkingPrice
/*             priceMinute: parkingPriceMinute,
            priceSecond: parkingPriceSecond
 */     
        };
    };
    this.setParkingRate = rate => {
        _parkingRate = rate;
    };
    this.$get = ()=> {
        return {
            calculateTicket: _calculateTicket
        };
    };
});
