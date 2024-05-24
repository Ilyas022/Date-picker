import { Theme } from 'src/types/interfaces'
//             0    1   2  3    4   5    6    7    8    9   10    11   12   13   14    15    16
const sizes = [24, 32, 48, 72, 94, 100, 120, 140, 255, 350, 445, 540, 600, 740, 1100, 1280, 1400]
//            0  1   2   3   4   5   6     7
const gaps = [8, 16, 20, 24, 30, 40, 120, 220]

//               0  1   2   3   4   5   6   7   8    9    10
const indents = [4, 8, 16, 20, 24, 40, 56, 80, 100, 120, 400]

//             0   1   2   3   4   5   6   7   8
const fonts = [14, 16, 20, 22, 24, 30, 38, 46, 56]

//                     0   1    2    3   4   5   6   7   8
const fontWeights = [300, 400, 500, 600]

//                   0   1   2   3   4   5      6
const lineHeights = [24, 28, 33, 40, 60, 112, 150]

//               0  1  2  3  4
const borders = [1, 2, 4, 8, 16]

//                    0  1  2  3  4
const bordersRadii = [1, 2, 3, 4, 8]

export const colors = {
	primary: '#2f80ed',
	secondary: '#f1f1f1',
	range: '#2f80ed1a',
	rangeStart: '#2f80ed99',
	holiday: '#ff0000',
	border: '#ddd',
	inActive: '#aaa',
	colorText: '#000',
}

export const theme: Theme = {
	fonts,
	fontWeights,
	colors,
	lineHeights,
	sizes,
	gaps,
	indents,
	borders,
	bordersRadii,
}
