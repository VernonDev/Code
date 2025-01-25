package main

import (
	"fmt"
	"math"
)

func main() {

	const inflationRate float64 = 2.5
	var investmentAmount float64
	var years float64
	var expectedReturnRate float64

	fmt.Print("Investment Amount: ")
	fmt.Scan(&investmentAmount)

	fmt.Print("Years: ")
	fmt.Scan(&years)

	fmt.Print("Expected Rate of Return: ")
	fmt.Scan(&expectedReturnRate)

	futureValue := (investmentAmount) * math.Pow(1+expectedReturnRate/100, years)
	futureRealValue := futureValue / math.Pow(1+inflationRate/100, years)

	// fmt.Println("Future Value: ", futureValue)
	// fmt.Println("Future Reale Value: ", futureRealValue)

	fmt.Printf("Future Value: %.0f\n", futureValue)
	fmt.Printf("Future Reale Value: %.0f\n", futureRealValue)
}
