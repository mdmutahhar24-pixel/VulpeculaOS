import { useEffect, useState } from 'react'

const CalculatorComponent = () => {
    const [display, setDisplay] = useState("0")
    const [expression, setExpression] = useState("")
    const [waitingForOperand, setWaitingForOperand] = useState(false)
    const [justCalculated, setJustCalculated] = useState(false)

    const operators = ["+", "-", "×", "÷"]

    const isOperator = (value: string) => operators.includes(value)

    const calculate = (expr: string): number | null => {
        try {
            const converted = expr
                .replace(/×/g, "*")
                .replace(/÷/g, "/")

            // Only allow calculator characters
            if (!/^[0-9+\-*/.()\s]+$/.test(converted)) {
                return null
            }

            const result = Function(`"use strict"; return (${converted})`)()

            if (
                typeof result !== "number" ||
                !Number.isFinite(result)
            ) {
                return null
            }

            return result
        } catch {
            return null
        }
    }

    const formatNumber = (value: number) => {
        if (Number.isInteger(value)) {
            return value.toString()
        }

        return Number(value.toFixed(10)).toString()
    }

    const pressNumber = (number: string) => {
        if (display === "Error" || justCalculated) {
            setDisplay(number)
            setExpression("")
            setJustCalculated(false)
            setWaitingForOperand(false)
            return
        }

        if (waitingForOperand) {
            setDisplay(number)
            setWaitingForOperand(false)
            return
        }

        if (display === "0") {
            setDisplay(number)
        } else {
            setDisplay(display + number)
        }
    }

    const pressDecimal = () => {
        if (display === "Error" || justCalculated) {
            setDisplay("0.")
            setExpression("")
            setJustCalculated(false)
            setWaitingForOperand(false)
            return
        }

        if (waitingForOperand) {
            setDisplay("0.")
            setWaitingForOperand(false)
            return
        }

        if (!display.includes(".")) {
            setDisplay(display + ".")
        }
    }

    const pressOperator = (operator: string) => {
        if (display === "Error") return

        if (justCalculated) {
            setExpression(display + " " + operator + " ")
            setJustCalculated(false)
            setWaitingForOperand(true)
            return
        }

        if (waitingForOperand) {
            // Replace the previous operator
            setExpression(prev => {
                const parts = prev.trim().split(" ")

                if (parts.length > 0) {
                    parts[parts.length - 1] = operator
                    return parts.join(" ") + " "
                }

                return display + " " + operator + " "
            })

            return
        }

        const newExpression =
            expression + display + " " + operator + " "

        setExpression(newExpression)
        setWaitingForOperand(true)
    }

    const pressEquals = () => {
        if (display === "Error") return

        if (!expression || waitingForOperand) return

        const fullExpression = expression + display
        const result = calculate(fullExpression)

        if (result === null) {
            setDisplay("Error")
            setExpression("")
            setWaitingForOperand(false)
            setJustCalculated(true)
            return
        }

        setDisplay(formatNumber(result))
        setExpression("")
        setWaitingForOperand(false)
        setJustCalculated(true)
    }

    const toggleSign = () => {
        if (display === "Error") return

        if (display === "0") return

        if (display.startsWith("-")) {
            setDisplay(display.slice(1))
        } else {
            setDisplay("-" + display)
        }

        setJustCalculated(false)
    }

    const clear = () => {
        setDisplay("0")
        setExpression("")
        setWaitingForOperand(false)
        setJustCalculated(false)
    }

    const backspace = () => {
        if (
            display === "Error" ||
            justCalculated ||
            waitingForOperand
        ) {
            return
        }

        if (display.length === 1 || display === "-0") {
            setDisplay("0")
            return
        }

        if (display.length === 2 && display.startsWith("-")) {
            setDisplay("0")
            return
        }

        setDisplay(display.slice(0, -1))
    }

    const handleButton = (value: string) => {
        if (/^[0-9]$/.test(value)) {
            pressNumber(value)
            return
        }

        if (value === ".") {
            pressDecimal()
            return
        }

        if (value === "C") {
            clear()
            return
        }

        if (value === "⌫") {
            backspace()
            return
        }

        if (value === "+/-") {
            toggleSign()
            return
        }

        if (isOperator(value)) {
            pressOperator(value)
            return
        }

        if (value === "=") {
            pressEquals()
        }
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const key = event.key

            if (/^[0-9]$/.test(key)) {
                handleButton(key)
            } else if (key === ".") {
                handleButton(".")
            } else if (key === "+") {
                handleButton("+")
            } else if (key === "-") {
                handleButton("-")
            } else if (key === "*") {
                handleButton("×")
            } else if (key === "/") {
                event.preventDefault()
                handleButton("÷")
            } else if (key === "Enter" || key === "=") {
                handleButton("=")
            } else if (key === "Escape") {
                handleButton("C")
            } else if (key === "Backspace") {
                handleButton("⌫")
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [display, expression, waitingForOperand, justCalculated])

    return (
        <div className="calcBody">

            <div className="calcDisplay">
                {expression && (
                    <div className="calcExpression">
                        {expression}
                    </div>
                )}

                <div id="CalcInput">
                    {display}
                </div>
            </div>

            <div className="calcBtns">

                <button
                    className="calcSpecial"
                    onClick={() => handleButton("C")}
                >
                    C
                </button>

                <button
                    className="calcSpecial"
                    onClick={() => handleButton("⌫")}
                >
                    ⌫
                </button>

                <button
                    className="calcSpecial"
                    onClick={() => handleButton("+/-")}
                >
                    +/-
                </button>

                <button
                    className="calcOperator"
                    onClick={() => handleButton("÷")}
                >
                    ÷
                </button>

                {[7, 8, 9].map(number => (
                    <button
                        key={number}
                        onClick={() => handleButton(number.toString())}
                    >
                        {number}
                    </button>
                ))}

                <button
                    className="calcOperator"
                    onClick={() => handleButton("×")}
                >
                    ×
                </button>

                {[4, 5, 6].map(number => (
                    <button
                        key={number}
                        onClick={() => handleButton(number.toString())}
                    >
                        {number}
                    </button>
                ))}

                <button
                    className="calcOperator"
                    onClick={() => handleButton("-")}
                >
                    -
                </button>

                {[1, 2, 3].map(number => (
                    <button
                        key={number}
                        onClick={() => handleButton(number.toString())}
                    >
                        {number}
                    </button>
                ))}

                <button
                    className="calcOperator"
                    onClick={() => handleButton("+")}
                >
                    +
                </button>

                <button
                    onClick={() => handleButton("0")}
                >
                    0
                </button>

                <button
                    onClick={() => handleButton(".")}
                >
                    .
                </button>

                <button
                    className="calcEquals"
                    onClick={() => handleButton("=")}
                >
                    =
                </button>

            </div>
        </div>
    )
}

export default CalculatorComponent