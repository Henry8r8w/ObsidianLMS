import {Plugin} from 'obsidian'
export default class ExamplePlugin extends Plugin{
	statusBarTextElement: HTMLSpanElement;
	onload(){
		this.statusBarTextElement = this.addStatusBarItem().createEl('span')
		this.readActiveFileAndUpdateLineCode ()
		this.app.workspace.on('active-leaf-change', async () => {
			this.readActiveFileAndUpdateLineCode () // when 
		})
		this.app.workspace.on('editor-change', editor =>{
			const content = editor.getDoc().getValue()
			this.updateLineCount(content);

		})
	}
	private updateLineCount(fileContent?: string){
		const count = fileContent ? fileContent.split(/\r\n|\r|\n/).length: 0;
		const linesWord = count === 1? "line" : "lines";
		this.statusBarTextElement.textContent = `${count} ${linesWord}`;
	}
	private async readActiveFileAndUpdateLineCode (){
		const file = this.app.workspace.getActiveFile()
			if (file){
				const content = await this.app.vault.read(file) // this method returns "promise" of string, so you need make our function async as well and make sure to "await" of the string
				console.log(content);
				this.updateLineCount(content);
			}
			else{
				this.updateLineCount(undefined)
			}
	}
}

