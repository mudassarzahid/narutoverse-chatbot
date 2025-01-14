import os
from pathlib import Path

import dotenv

dotenv.load_dotenv()
MISTRAL_EMBED_MODEL = os.environ["MISTRAL_EMBED_MODEL"]
MISTRAL_LANGUAGE_MODEL_LARGE = os.environ["MISTRAL_LANGUAGE_MODEL_LARGE"]
MISTRAL_LANGUAGE_MODEL_MEDIUM = os.environ["MISTRAL_LANGUAGE_MODEL_MEDIUM"]

CURRENT_PATH = os.path.realpath(__file__)
ROOT_DIR = Path(CURRENT_PATH).parent.parent.absolute()
LOGS_DIR = str(ROOT_DIR.joinpath("logs"))
VECTOR_DB_DIR = str(ROOT_DIR.joinpath("llm", "vectordb"))
NARUTO_WIKI_DB_FILE = str(ROOT_DIR.joinpath("database", "database.sqlite3"))
NARUTO_WIKI_BASE_URL = "https://naruto.fandom.com"
