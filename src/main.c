#include <stdio.h>
#include <string.h>
#include <ctype.h>

int hexToDecimal(char* hexString) {
    int decimal = 0;
    int len = strlen(hexString);

    for (int i = 0; i < len; i++) {
        char c = tolower(hexString[i]);
        int digit;
        
        if (isdigit(c)) {
            digit = c - '0';
        } else if (c >= 'a' && c <= 'f') {
            digit = c - 'a' + 10;
        } else {
            // Invalid character in the input string
            return -1;
        }

        decimal = decimal * 16 + digit;
    }

    return decimal;
}