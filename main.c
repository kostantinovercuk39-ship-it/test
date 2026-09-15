#include <stdio.h>
#include <string.h>

int main() {
    char currency[10];
    double amount, result;

    printf("Enter currency (USD/EUR): ");
    scanf("%s", currency);

    printf("Enter amount: ");
    scanf("%lf", &amount);

    if (strcmp(currency, "USD") == 0) {
        result = amount * 41.5;
    } else if (strcmp(currency, "EUR") == 0) {
        result = amount * 45.0;
    } else {
        printf("Unknown currency\n");
        return 1;
    }

    printf("Result: %.2f UAH\n", result);
    return 0;
}