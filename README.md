## Apitera Recruitment Task

### Wytyczne:

- przygotuj widok wyświetlający tabelę pierwiastków (kolumny Number, Name, Weight, Symbol) - ✔️ wykonano
- zasymuluj pobieranie danych do tabeli podczas startu - ✔️ wykonano
  - symulacje wykonano poprzez dodanie operatora delay z bilbioteki rxjs, za pomocą operatora tap uruchamiamy spinnera a następnie podczas subskrypcji jest on wyłączany; w przypadku, gdyby dane rzeczywiście były pobierane z jakiegoś zewnętrznego api za pomocą http request, wtedy logika spinnera zostałaby obsłużona przez interceptor
- dodaj możliwość edycji dowolnej wartości rekordu wyświetlonego w tabeli, po zatwierdzeniu zmian, wiersz tabeli powinien się zaktualizować; edycja powinna odbywać się bez mutowaniia danych - ✔️ wykonano
  - przy każdej wartości mamy ikonkę, po kliknięcia na którą wyskakuje popup z możliwością wpisania nowej wartości, od siebie dorzuciłem małą walidację z wykorzystaniem regexu, tak że dla pól string akceptowane są tylko małe i duże litery a dla pol number integery oraz float (np. 234.423)
  - dane zmieniają się tylko na poziomie komponentu, nawet w serwisie pozostaje niezmienione
- dodaj filtr, który pozwoli na filtrowanie wyników (jeden input filtrujący po wszystkich polach), filtrowanie powinno odbywać się po 2s bez zmiany wartości w inpucie - ✔️ wykonano
  - opóźnienie filtrowania wykonane za pomocą operatora debounceTime z biblioteki rxjs
- jako bibliotekę do komponentów użyj https://material.angular.io/ - ✔️ wykonano
- zadanie do napisania w Angular 18.2.2. - ✔️ wykonano
