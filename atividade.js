class Aluno {
    constructor(nome, nota, ativo = true) {
        this.nome = nome;
        this.nota = nota;
        this.ativo = ativo;
    }

    status() {
        return this.ativo ? "A" : "I";
    }
}

class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}

class ListaLigada {
    constructor() {
        this.head = null;
        this.length = 0;
        this.max = 40;
    }

    append(element) {
        if (this.length >= this.max) return false;

        const node = new Node(element);
        let current;

        if (this.head === null) {
            this.head = node;
        } else {
            current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = node;
        }

        this.length++;
        console.log(`${element.nome} adicionado na posicao ${this.length}.`);
        return true;
    }

    getElementAt(index) {
        if (index < 0 || index >= this.length) return null;

        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current;
    }

    insert(element, position) {
        if (position < 0 || position > this.length || this.length >= this.max) {
            return false;
        }

        const node = new Node(element);

        if (position === 0) {
            node.next = this.head;
            this.head = node;
        } else {
            const previous = this.getElementAt(position - 1);
            const current = previous.next;

            node.next = current;
            previous.next = node;
        }

        this.length++;
        console.log(`${element.nome} adicionado na posicao ${position + 1}.`);
        return true;
    }

    indexOf(nome) {
        let current = this.head;
        let index = 0;

        while (current) {
            if (current.element.nome === nome) {
                return index;
            }
            index++;
            current = current.next;
        }
        return -1;
    }

    removeAt(position) {
        if (position < 0 || position >= this.length) return null;

        let removed;

        if (position === 0) {
            removed = this.head;
            this.head = removed.next;
        } else {
            const previous = this.getElementAt(position - 1);
            removed = previous.next;
            previous.next = removed.next;
        }

        this.length--;
        console.log(`${removed.element.nome} removido da posicao ${position + 1}.`);
        return removed.element;
    }

    remove(nome) {
        const index = this.indexOf(nome);
        if (index !== -1) return this.removeAt(index);
        return null;
    }

    ordenarPorNota() {
        if (this.length < 2) return;

        let swapped;

        do {
            swapped = false;
            let current = this.head;

            while (current && current.next) {
                if (current.element.nota < current.next.element.nota) {
                    const temp = current.element;
                    current.element = current.next.element;
                    current.next.element = temp;
                    swapped = true;
                }
                current = current.next;
            }
        } while (swapped);
    }

    mostrarTabela() {
        console.log("Pos Aluno nota Status");
        console.log("--- ------ ---- ------");

        let current = this.head;
        let index = 1;

        while (current) {
            const nome = current.element.nome.padEnd(6);
            const nota = current.element.nota.toFixed(1).padEnd(4);
            const status = current.element.status();

            console.log(`${index} ${nome} ${nota} ${status}`);
            index++;
            current = current.next;
        }

        console.log("");
    }
}


// -------------------------------
// EXEMPLO EXATO DO PDF
// -------------------------------

const lista = new ListaLigada();

lista.append(new Aluno("Pedro", 8.9));
lista.append(new Aluno("Ana", 8.7));
lista.append(new Aluno("Maria", 9.3, false));

console.log("");
lista.mostrarTabela();

lista.remove("Pedro");
lista.mostrarTabela();

lista.insert(new Aluno("Paula", 9.1), 0);
lista.mostrarTabela();

lista.insert(new Aluno("Pedro", 8.2), 1);
lista.append(new Aluno("Joao", 7.5));

console.log("");
lista.mostrarTabela();
