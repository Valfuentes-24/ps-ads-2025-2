import { z } from 'zod'

const maxSellingDate = new Date(); // Hoje
const minManufactureDate = new Date(1960, 0, 1); // mínima 1º de janeiro de 1960

const maxYearManufacture = new Date();
maxYearManufacture.setFullYear(maxYearManufacture.getFullYear());

// Pega o ano minManufactureDate e maxYearManufacture para year_manufacture
const minYear = minManufactureDate.getFullYear();
const maxYear = maxYearManufacture.getFullYear();

// Selling_date
const storeOpen = new Date(2020, 3, 20); // abertura da loja (20/03/2020)

// Cores
const validColors = [
  'AMARELO', 'AZUL', 'BRANCO', 'CINZA', 'DOURADO', 'LARANJA', 'MARROM', 'PRATA', 'PRETO', 'ROSA', 'ROXO', 'VERDE', 'VERMELHO'
]

const Car = z.object({
  brand: z.string()
    .trim()  
    .min(1, { message: 'Preencher com o mínimo de 1 caractere!' })
    .max(25, { message: 'Preencher com o máximo de 25 caracteres!' }),
  
  model: z.string()
    .trim()  
    .min(1, { message: 'Preencher com o mínimo de 1 caractere!' })
    .max(25, { message: 'Preencher com o máximo de 25 caracteres!' }),
  
  color: z.enum(validColors, { 
    message: 'Cor inválida!' 
  }),
  
  year_manufacture: z.coerce.number()
    .int({ message: 'Este campo deve conter somente número inteiro.' })
    .min(minYear, { message: 'A data deve ser a partir de 1960.' })
    .max(maxYear, { message: `A datanão pode ser maior que o ano atual (${maxYear}).` }),
  
  imported: z.boolean({
    message: 'O campo "importado" deve ser verdadeiro ou falso.'
  }),
  
  plates: z.string()
    .transform(value => value.replace('_', ''))
    .transform(value => value.trim())
    .refine(value => value.length === 8, {
      message: 'Este campo deve conter 8 caracteres.'
  }),
  
  selling_date: z.coerce.date()
    .min(storeOpen, {
      message: 'Data de venda Inválida! Data informada anterior a 20/03/2020.'
    })
    .max(maxSellingDate, {
      message: 'Data inválida! A data informada não pode ser posterior à atual.'
    })
    .nullish(), // opcional
  
  selling_price: z.coerce.number()
    .gte(5000, { message: 'Valor informado deve ser o mínimo R$ 5.000,00.' })
    .lte(5000000, { message: 'Valor informado deve ser o máximo R$ 5.000.000,00.' })
    .nullish() // opcional
})

export default Car