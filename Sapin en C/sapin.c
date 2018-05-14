#include <stdlib.h>
#include <unistd.h>
#include <stdio.h>


int lines(int size);

void my_putchar(char c)
{
    write(1, &c, 1);
}


 void my_putstr(char *str) /*On donne l'adresse d'une string */
 {
     int i; /*On déclare une variable i = 0*/

     i = 0;

     while(str[i] != '\0') /*On veut déplacer de i case jusqu'à arriver à la fin*/
     {
         my_putchar(str[i]); /*on écrit 1 car, puis on déplace de 1 case*/
         i++;
     }
 }


void    print_x_chars(char c, int count, char new_line)
{
    while (count > 0)
    {
        write(1, &c, 1);
       count--;
    }
    if (new_line)
        write(1, "\n", 1);
} 

int trunk_width(int size)
{
    if(size % 2 != 0)
        return size;
    else
        return size +1;
}

void print_trunk(int size, int cols_last_line)
{
    int i = 0;
    int col;
    int offset;
    int j = 0;

    col = trunk_width(size);
    offset = (cols_last_line - size) / 2;

    while (j < size)
    { while(i<offset)
    {
        my_putchar(' ');
        i++;
    }

    i = 0;

    while(i<col)
    {
        my_putchar('|');
        i++;
    }
    my_putchar('\n');
    j++;
    i=0;}
}





void display(int nb_stages, int cols_last_line, int nb_stars)
{
    // printf("%d %d %d\n", cols_last_line, nb_stars, ((cols_last_line - nb_stars) / 2));
    print_x_chars(' ', ((cols_last_line - nb_stars) / 2), 0);
    print_x_chars('*', nb_stars, 1);

}

int funct(int size) {
    //     int i = 0;
    //     int nb_l = 0;
    //     int c_stage = 0;
    //     int nb_star = 0;
    //     int nb_stage = size;
    //     int c_line = 0;
    //     int pair = 1;
        

    // while (c_stage < nb_stage) {
 
    //       nb_l = 4 + i;
    //       if (c_stage % 2 == 0 && c_stage != 0) {
    //         nb_star-= 2 ;
    //       }
    //       while (c_line < nb_l) { 
    //         c_line +=1;
    //         nb_star += 2;
    //         }
    // c_line = 0;
    // c_stage +=1;
    // i++;

    int niveau;
    int line;
    int nb_line;
    int nb_stars;
    int i = 0;
    int stage_even = 0;
    
    nb_stars = 1;
    nb_line = 4;
    niveau = 0;
    while (niveau < size)
    {
        line = 0;
        while(line < nb_line)
        {
                line++;

                nb_stars = nb_stars + 2;


        }
        if (niveau % 2 == 0 && niveau != 0) {
            stage_even += 2;
        }
        nb_stars -= stage_even;
        nb_stars -= 4; 
        nb_line++;
        niveau++;
    }
    //printf("c_stage = %i \n nb_stage = %i\n nb_star = %i \n",c_stage, nb_stage, nb_star);


    nb_stars = nb_stars + 2 + stage_even;
  return nb_stars;
}

int treatment(int size, int cols_last_line)
{
    int niveau;
    int line;
    int nb_line;
    int nb_stars;
    int i = 0;
    int stage_even = 0;
    
    nb_stars = 1;
    nb_line = 4;
    niveau = 0;
    cols_last_line = funct(size);
    while (niveau < size)
    {
        line = 0;
        while(line < nb_line)
        {
                display(size, cols_last_line, nb_stars);
                
                line++;

                nb_stars = nb_stars + 2;


        }
        if (niveau % 2 == 0 && niveau != 0) {
            stage_even += 2;
        }
        nb_stars -= stage_even;
        nb_stars -= 4; 
        nb_line++;
        niveau++;
    }

         print_trunk(size, cols_last_line);
return(0);
}


void sapin(int size)
{
    
    treatment(size, 0);


}

int main(int ac, char **av)
{
    int size;


    if (av[1] == NULL){
        printf("Please enter A NUMBER\n");
        return(1);}

  
    
    size = atoi(av[1]);

    if (size == 0){
        printf("Please enter correct parameters\n");
        return(1);}

    else if (ac < 2 || ac > 2){
        printf("Only one please (no carrots for you) \n");
        return(1);
    }


    sapin(size);

  return(0);  
    
}



