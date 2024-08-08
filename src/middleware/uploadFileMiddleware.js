import multer from "multer";
import { v4 as uuidv4 } from "uuid";

/**
 * Configuração do storage para o Multer, definindo onde e como os arquivos de upload serão armazenados.
 * Utiliza a biblioteca `uuid` para gerar nomes de arquivo únicos e previne conflitos de nomes.
 */
const storage = multer.diskStorage({
    /**
     * Define o destino dos arquivos de upload.
     * 
     * @param {Object} req - O objeto de requisição do Express.
     * @param {Object} file - Objeto contendo informações sobre o arquivo de upload.
     * @param {Function} cb - Callback que deve ser chamado com o destino do arquivo.
     */
    destination: (req, file, cb) => {
        // Define a pasta 'uploads/' como o destino para os arquivos salvos.
        cb(null, "uploads/");
    },

    /**
     * Define o nome do arquivo a ser salvo.
     * 
     * @param {Object} req - O objeto de requisição do Express.
     * @param {Object} file - Objeto contendo informações sobre o arquivo de upload.
     * @param {Function} cb - Callback que deve ser chamado com o novo nome do arquivo.
     */
    filename: (req, file, cb) => {
        // Gera um nome de arquivo único usando `uuidv4` e adiciona a extensão `.xlsx`.
        cb(null, `${uuidv4()}.xlsx`);
    }
});

/**
 * Cria uma instância do multer com a configuração de armazenamento definida.
 * O objeto `upload` pode ser usado como middleware em rotas que aceitam uploads de arquivos.
 */
export const upload = multer({ storage: storage });
