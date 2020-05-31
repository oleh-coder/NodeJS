// Підключаємо модуль (для роботи із файловою системою)
const fs = require('fs').promises;
// Підключаємо модуль path (для роботи із шляхами)
const path = require('path');

async function swap(folderFrom, folderTo) {

    // Шлях до папки звідки перемістити
    const pachFolderFrom = path.join(__dirname, folderFrom);
    // Шлях до папки куди перемістити
    const pachFolderTo = path.join(__dirname, folderTo);
    // Шлях до темчасової папки
    const pachFolderTemp = path.join(__dirname, 'temp');

    // Стврюємо темчасову папку (temp)
    await fs.mkdir(pachFolderTemp);

    await copyFile(pachFolderFrom, pachFolderTemp);
    await copyFile(pachFolderTo, pachFolderFrom);
    await copyFile(pachFolderTemp, pachFolderTo);

    // Видалення тим часової папки (temp)
    await fs.rmdir(pachFolderTemp)

}

async function copyFile(pachFolderFrom, pachFolderTo) {
   // Зчитуємо папку із звідки перемісти файли. куди, а саме тимчасову папку
   const files = await fs.readdir(pachFolderFrom);
    for (const file of files) {

      fs.rename(
            path.join(pachFolderFrom, file),
            path.join(pachFolderTo, file),

      )
        
    }
}



swap('1800', '2000');